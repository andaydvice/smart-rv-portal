import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLinkButton } from '@/components/ui/external-link-button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, ClipboardCheck, Download, AlertCircle, Brain, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import jsPDF from 'jspdf';

interface ChecklistItem {
  category: string;
  item: string;
  priority: 'essential' | 'important' | 'nice-to-have';
  questions: string[];
}

interface AIChecklistResult {
  checklistItems: ChecklistItem[];
  summary: string;
  budgetConsiderations: string;
  dealerQuestions: string[];
  searchUrls: {
    buyUrl: string;
    reviewsUrl: string;
    dealersUrl: string;
    priceCheckerUrl: string;
  };
}

const formatTextWithParagraphs = (text: string, inline: boolean = false): React.ReactNode => {
  if (!text) return null;
  
  // Step 1: Remove markdown bold formatting
  let cleanText = text.replace(/\*\*/g, '');
  
  // Step 1.5: Remove hyphens between words (but preserve in numbers/codes)
  cleanText = cleanText.replace(/([a-zA-Z])-([a-zA-Z])/g, '$1 $2');
  
  // For inline mode (inside bullet lists), return clean text without extra paragraphs
  if (inline) {
    return <span className="leading-relaxed">{cleanText}</span>;
  }
  
  // Step 2: Add line breaks before bullet points if not already present
  cleanText = cleanText.replace(/([^\n])\s*•\s*/g, '$1\n\n• ');
  
  // Step 3: Add line breaks after lines ending with colon if followed by non-whitespace
  cleanText = cleanText.replace(/:\s*([^\s])/g, ':\n\n$1');
  
  // Step 3.5: Add line breaks after sentence-ending punctuation (. ! ?)
  // Only break when followed by space and capital letter (start of new sentence)
  cleanText = cleanText.replace(/([.!?])\s*(?=[A-Z])/g, '$1\n\n');
  
  // Step 4: Split on double newlines (including our injected ones)
  const paragraphs = cleanText
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  // Step 5: Render with proper spacing
  return (
    <div className="space-y-4">
      {paragraphs.map((para, index) => (
        <p key={index} className="leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  );
};

export const AITechnologyChecklist: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<AIChecklistResult | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!userInput.trim()) return;

    setIsGenerating(true);
    setError('');
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-technology-checklist', {
        body: { userRequirements: userInput.trim() }
      });

      if (error) throw error;

      console.log('Full response data:', data);
      
      // The edge function returns { checklist: AIChecklistResult }
      const checklistData = data?.checklist || data;
      
      console.log('Checklist data:', checklistData);
      
      // Validate the data structure
      if (!checklistData || !checklistData.checklistItems || !Array.isArray(checklistData.checklistItems)) {
        console.error('Invalid checklist structure:', checklistData);
        throw new Error('Invalid response format from AI service');
      }

      setResult(checklistData);

    } catch (error) {
      console.error('AI Checklist error:', error);
      setError('Checklist generation is temporarily unavailable. Please try again later or use our manual checklist.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper functions for sentence-aware paragraph formatting
  const formatTextAsParagraphs = (text: string, maxWidth: number, doc: any) => {
    const sentences = text
      .split(/\.\s+|\.\n+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    const paragraphs: string[][] = [];
    
    sentences.forEach(sentence => {
      if (sentence.trim()) {
        const fullSentence = sentence.trim().endsWith('.') ? sentence.trim() : sentence.trim() + '.';
        const wrapped = doc.splitTextToSize(fullSentence, maxWidth);
        paragraphs.push(wrapped);
      }
    });
    
    return paragraphs;
  };

  const drawParagraphs = (
    doc: any,
    paragraphs: string[][],
    x: number,
    y: number,
    lineHeight: number = 5,
    paragraphSpacing: number = 8
  ) => {
    let currentY = y;
    
    paragraphs.forEach((paragraph, index) => {
      doc.text(paragraph, x, currentY);
      currentY += paragraph.length * lineHeight;
      
      if (index < paragraphs.length - 1) {
        currentY += paragraphSpacing;
      }
    });
    
    return currentY;
  };

  const generateDownload = () => {
    if (!result) return;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;
    let yPosition = 20;

    // Helper to add page break if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
        return true;
      }
      return false;
    };

    // Helper to add footer with gradient bar
    const addFooter = () => {
      const pageNumber = (doc as any).internal.getNumberOfPages();
      
      // Gradient bar at top of footer
      for (let i = 0; i < 2; i++) {
        const alpha = 150 - (i * 40);
        doc.setDrawColor(91, 155, 213);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 15 - i * 0.3, pageWidth - margin, pageHeight - 15 - i * 0.3);
      }
      
      // Footer background
      doc.setFillColor(248, 249, 250);
      doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');
      
      // Footer text
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(new Date().toLocaleDateString(), margin, pageHeight - 8);
      doc.text('Generated by Smart RV Hub AI Technology Consultant', pageWidth / 2, pageHeight - 8, { align: 'center' });
      doc.setTextColor(91, 155, 213);
      doc.text(`Page ${pageNumber}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
    };

    // STUNNING COVER PAGE
    // Deep gradient background
    for (let i = 0; i < pageHeight; i += 2) {
      const ratio = i / pageHeight;
      const r = Math.round(8 + (21 - 8) * ratio);
      const g = Math.round(15 + (26 - 15) * ratio);
      const b = Math.round(31 + (34 - 31) * ratio);
      doc.setFillColor(r, g, b);
      doc.rect(0, i, pageWidth, 2, 'F');
    }
    
    // Hero section with modern typography
    yPosition = 70;
    
    // Decorative accent bar
    doc.setFillColor(91, 155, 213);
    doc.roundedRect(pageWidth / 2 - 40, yPosition - 10, 80, 4, 2, 2, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('Smart RV Hub', pageWidth / 2, yPosition, { align: 'center' });
    
    doc.setFontSize(28);
    doc.setFont('helvetica', 'normal');
    doc.text('AI Technology Research', pageWidth / 2, yPosition + 18, { align: 'center' });
    doc.text('Checklist', pageWidth / 2, yPosition + 33, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(14);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(226, 232, 255);
    doc.text('Personalized for Your RV Lifestyle', pageWidth / 2, yPosition + 50, { align: 'center' });
    
    // Gradient accent bar
    for (let i = 0; i < 3; i++) {
      const startColor = [91, 155, 213];
      const endColor = [96, 165, 250];
      doc.setDrawColor(
        startColor[0] + (endColor[0] - startColor[0]) * (i / 3),
        startColor[1] + (endColor[1] - startColor[1]) * (i / 3),
        startColor[2] + (endColor[2] - startColor[2]) * (i / 3)
      );
      doc.setLineWidth(1);
      doc.line(pageWidth / 2 - 60, yPosition + 60 + i, pageWidth / 2 + 60, yPosition + 60 + i);
    }
    
    // Date in elegant small caps
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 200, 200);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 30, { align: 'center' });
    
    // EXECUTIVE SUMMARY - Magazine Style
    doc.addPage();
    yPosition = margin + 10;
    
    // Lightbulb icon (using text)
    doc.setFontSize(16);
    doc.setTextColor(96, 165, 250);
    doc.text('💡', margin, yPosition);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Executive Summary', margin + 10, yPosition);
    yPosition += 3;
    
    // Colored accent bar
    for (let i = 0; i < 3; i++) {
      doc.setDrawColor(91, 155, 213);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition + i * 0.8, pageWidth - margin, yPosition + i * 0.8);
    }
    yPosition += 8;
    
    // Light blue background box with rounded corners
    const summaryBoxTop = yPosition;
    doc.setFillColor(226, 232, 255);
    doc.roundedRect(margin, summaryBoxTop, pageWidth - 2 * margin, 0, 5, 5, 'F');
    
    // Side accent stripe
    doc.setFillColor(91, 155, 213);
    doc.roundedRect(margin, summaryBoxTop, 3, 0, 1.5, 1.5, 'F');
    
    yPosition += 10;
    
    // Sentence-aware paragraphs
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(31, 41, 55);
    const summaryParagraphs = formatTextAsParagraphs(result.summary, pageWidth - 2 * margin - 20, doc);
    const summaryEndY = drawParagraphs(doc, summaryParagraphs, margin + 10, yPosition, 5, 10);
    
    // Complete the background box
    const summaryBoxHeight = summaryEndY - summaryBoxTop + 10;
    doc.setFillColor(226, 232, 255);
    doc.roundedRect(margin, summaryBoxTop, pageWidth - 2 * margin, summaryBoxHeight, 5, 5, 'F');
    
    // Redraw side accent stripe
    doc.setFillColor(91, 155, 213);
    doc.roundedRect(margin, summaryBoxTop, 3, summaryBoxHeight, 1.5, 1.5, 'F');
    
    // Redraw text on top
    yPosition = summaryBoxTop + 10;
    doc.setTextColor(31, 41, 55);
    drawParagraphs(doc, summaryParagraphs, margin + 10, yPosition, 5, 10);
    
    yPosition = summaryEndY + 20;
    
    // BUDGET CONSIDERATIONS - Alert Style
    checkPageBreak(40);
    
    // Dollar icon
    doc.setFontSize(16);
    doc.setTextColor(245, 158, 11);
    doc.text('💵', margin, yPosition);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Budget Considerations', margin + 10, yPosition);
    yPosition += 8;
    
    // Orange background box
    const budgetBoxTop = yPosition;
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(margin, budgetBoxTop, pageWidth - 2 * margin, 0, 5, 5, 'F');
    
    // Bold left border
    doc.setFillColor(245, 158, 11);
    doc.roundedRect(margin, budgetBoxTop, 4, 0, 2, 2, 'F');
    
    yPosition += 10;
    
    // Sentence-aware paragraphs
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(31, 41, 55);
    const budgetParagraphs = formatTextAsParagraphs(result.budgetConsiderations, pageWidth - 2 * margin - 20, doc);
    const budgetEndY = drawParagraphs(doc, budgetParagraphs, margin + 10, yPosition, 5, 10);
    
    // Complete the background box
    const budgetBoxHeight = budgetEndY - budgetBoxTop + 10;
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(margin, budgetBoxTop, pageWidth - 2 * margin, budgetBoxHeight, 5, 5, 'F');
    
    // Redraw left border
    doc.setFillColor(245, 158, 11);
    doc.roundedRect(margin, budgetBoxTop, 4, budgetBoxHeight, 2, 2, 'F');
    
    // Redraw text on top
    yPosition = budgetBoxTop + 10;
    doc.setTextColor(31, 41, 55);
    drawParagraphs(doc, budgetParagraphs, margin + 10, yPosition, 5, 10);
    
    yPosition = budgetEndY + 15;

    addFooter();

    // TECHNOLOGY CHECKLIST - Premium Card Design
    doc.addPage();
    yPosition = margin + 10;
    
    // Clipboard icon
    doc.setFontSize(16);
    doc.setTextColor(91, 155, 213);
    doc.text('📋', margin, yPosition);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Technology Checklist', margin + 10, yPosition);
    yPosition += 3;
    
    // Gradient accent bar
    for (let i = 0; i < 3; i++) {
      doc.setDrawColor(91, 155, 213);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition + i * 0.8, pageWidth - margin, yPosition + i * 0.8);
    }
    yPosition += 15;

    // Sort by priority
    const sortedItems = [...result.checklistItems].sort((a, b) => {
      const priorityOrder = { 'essential': 1, 'important': 2, 'nice-to-have': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // Draw each item as a premium card
    sortedItems.forEach((item, index) => {
      const cardPadding = 8;
      const cardStartY = yPosition;
      let cardContentY = yPosition + cardPadding;
      
      // Check if we need a page break
      const estimatedHeight = 70;
      if (cardContentY + estimatedHeight > pageHeight - margin - 20) {
        addFooter();
        doc.addPage();
        yPosition = margin + 10;
        cardContentY = yPosition + cardPadding;
      }
      
      // Card background with subtle gradient (simulated with layers)
      doc.setFillColor(250, 251, 252);
      doc.roundedRect(margin, cardStartY, pageWidth - 2 * margin, 0, 6, 6, 'F');
      
      // 3pt border in brand blue
      doc.setDrawColor(91, 155, 213);
      doc.setLineWidth(0.8);
      doc.roundedRect(margin, cardStartY, pageWidth - 2 * margin, 0, 6, 6, 'S');
      
      // Enhanced Priority Badge - Top Right with gradient
      const badgeWidth = 70;
      const badgeHeight = 24;
      const badgeX = pageWidth - margin - badgeWidth - cardPadding;
      const badgeY = cardContentY;
      
      const priorityColors: { [key: string]: [number, number, number][] } = {
        'essential': [[239, 68, 68], [220, 38, 38]],
        'important': [[245, 158, 11], [234, 88, 12]],
        'nice-to-have': [[16, 185, 129], [5, 150, 105]]
      };
      
      const [color1, color2] = priorityColors[item.priority];
      
      // Gradient background for badge (simulated)
      for (let i = 0; i < badgeHeight; i++) {
        const ratio = i / badgeHeight;
        const r = Math.round(color1[0] + (color2[0] - color1[0]) * ratio);
        const g = Math.round(color1[1] + (color2[1] - color1[1]) * ratio);
        const b = Math.round(color1[2] + (color2[2] - color1[2]) * ratio);
        doc.setFillColor(r, g, b);
        doc.roundedRect(badgeX, badgeY + i, badgeWidth, 1, 4, 4, 'F');
      }
      
      const priorityText = 
        item.priority === 'essential' ? 'ESSENTIAL' :
        item.priority === 'important' ? 'IMPORTANT' :
        'NICE TO HAVE';
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(priorityText, badgeX + badgeWidth / 2, badgeY + 15, { align: 'center' });
      
      cardContentY += 8;
      
      // Checkmark icon + Item Title
      doc.setFontSize(14);
      doc.setTextColor(91, 155, 213);
      doc.text('✓', margin + cardPadding, cardContentY);
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(21, 26, 34);
      const titleMaxWidth = pageWidth - 2 * margin - 2 * cardPadding - badgeWidth - 15;
      const titleLines = doc.splitTextToSize(item.item, titleMaxWidth);
      doc.text(titleLines, margin + cardPadding + 8, cardContentY);
      cardContentY += titleLines.length * 7 + 5;
      
      // Category with light separator
      doc.setFontSize(11);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(107, 114, 128);
      doc.text(item.category, margin + cardPadding, cardContentY);
      cardContentY += 8;
      
      // Light separator line
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.3);
      doc.line(margin + cardPadding, cardContentY, pageWidth - margin - cardPadding, cardContentY);
      cardContentY += 8;
      
      // "Key Questions to Ask" Section with icon
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text('❓', margin + cardPadding, cardContentY);
      doc.text('Key Questions to Ask:', margin + cardPadding + 8, cardContentY);
      cardContentY += 10;
      
      // Light blue background for questions area (will redraw after calculating height)
      const questionsStartY = cardContentY;
      
      // Questions with proper formatting
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(31, 41, 55);
      
      item.questions.forEach((question, qIndex) => {
        // Check for page break
        if (cardContentY + 20 > pageHeight - margin - 20) {
          // Complete current card
          const currentCardHeight = cardContentY - cardStartY + cardPadding;
          doc.setFillColor(250, 251, 252);
          doc.roundedRect(margin, cardStartY, pageWidth - 2 * margin, currentCardHeight, 6, 6, 'F');
          doc.setDrawColor(91, 155, 213);
          doc.setLineWidth(0.8);
          doc.roundedRect(margin, cardStartY, pageWidth - 2 * margin, currentCardHeight, 6, 6, 'S');
          
          addFooter();
          doc.addPage();
          yPosition = margin + 10;
          cardContentY = yPosition + cardPadding;
        }
        
        // Blue bullet
        doc.setTextColor(91, 155, 213);
        doc.setFontSize(12);
        doc.text('•', margin + cardPadding + 5, cardContentY);
        
        // Question text with sentence-aware formatting
        doc.setTextColor(31, 41, 55);
        doc.setFontSize(10);
        const questionMaxWidth = pageWidth - 2 * margin - 2 * cardPadding - 15;
        const questionParagraphs = formatTextAsParagraphs(question, questionMaxWidth, doc);
        const questionEndY = drawParagraphs(doc, questionParagraphs, margin + cardPadding + 10, cardContentY, 5, 6);
        
        cardContentY = questionEndY + 10;
      });
      
      // Complete the card with all backgrounds and borders
      const cardHeight = cardContentY - cardStartY + cardPadding;
      
      // Redraw card background
      doc.setFillColor(250, 251, 252);
      doc.roundedRect(margin, cardStartY, pageWidth - 2 * margin, cardHeight, 6, 6, 'F');
      
      // Light blue background for questions area
      const questionsHeight = cardContentY - questionsStartY;
      if (questionsHeight > 0) {
        doc.setFillColor(239, 246, 255);
        doc.roundedRect(margin + cardPadding, questionsStartY - 2, pageWidth - 2 * margin - 2 * cardPadding, questionsHeight + 2, 3, 3, 'F');
      }
      
      // Redraw border
      doc.setDrawColor(91, 155, 213);
      doc.setLineWidth(0.8);
      doc.roundedRect(margin, cardStartY, pageWidth - 2 * margin, cardHeight, 6, 6, 'S');
      
      // Redraw all text content on top
      cardContentY = cardStartY + cardPadding;
      
      // Redraw priority badge
      for (let i = 0; i < badgeHeight; i++) {
        const ratio = i / badgeHeight;
        const r = Math.round(color1[0] + (color2[0] - color1[0]) * ratio);
        const g = Math.round(color1[1] + (color2[1] - color1[1]) * ratio);
        const b = Math.round(color1[2] + (color2[2] - color1[2]) * ratio);
        doc.setFillColor(r, g, b);
        doc.roundedRect(badgeX, badgeY + i, badgeWidth, 1, 4, 4, 'F');
      }
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(priorityText, badgeX + badgeWidth / 2, badgeY + 15, { align: 'center' });
      
      cardContentY += 8;
      
      // Redraw title
      doc.setFontSize(14);
      doc.setTextColor(91, 155, 213);
      doc.text('✓', margin + cardPadding, cardContentY);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(21, 26, 34);
      doc.text(titleLines, margin + cardPadding + 8, cardContentY);
      cardContentY += titleLines.length * 7 + 5;
      
      // Redraw category
      doc.setFontSize(11);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(107, 114, 128);
      doc.text(item.category, margin + cardPadding, cardContentY);
      cardContentY += 8;
      
      // Redraw separator
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.3);
      doc.line(margin + cardPadding, cardContentY, pageWidth - margin - cardPadding, cardContentY);
      cardContentY += 8;
      
      // Redraw questions header
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text('❓', margin + cardPadding, cardContentY);
      doc.text('Key Questions to Ask:', margin + cardPadding + 8, cardContentY);
      cardContentY += 10;
      
      // Redraw questions
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      item.questions.forEach((question) => {
        doc.setTextColor(91, 155, 213);
        doc.setFontSize(12);
        doc.text('•', margin + cardPadding + 5, cardContentY);
        
        doc.setTextColor(31, 41, 55);
        doc.setFontSize(10);
        const questionMaxWidth = pageWidth - 2 * margin - 2 * cardPadding - 15;
        const questionParagraphs = formatTextAsParagraphs(question, questionMaxWidth, doc);
        cardContentY = drawParagraphs(doc, questionParagraphs, margin + cardPadding + 10, cardContentY, 5, 6) + 10;
      });
      
      // Decorative gradient separator between cards
      yPosition = cardContentY + cardPadding + 5;
      for (let i = 0; i < 2; i++) {
        doc.setDrawColor(91, 155, 213);
        doc.setLineWidth(0.2);
        doc.line(margin + 30, yPosition + i * 0.5, pageWidth - margin - 30, yPosition + i * 0.5);
      }
      
      yPosition += 15;
    });

    // DEALER QUESTIONS - Interactive Checklist Style
    checkPageBreak(50);
    if (yPosition < margin + 30) {
      addFooter();
      doc.addPage();
      yPosition = margin + 10;
    }
    
    // Message circle icon
    doc.setFontSize(16);
    doc.setTextColor(91, 155, 213);
    doc.text('📋', margin, yPosition);
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Questions for RV Dealers', margin + 10, yPosition);
    yPosition += 3;
    
    // Gradient blue header bar
    for (let i = 0; i < 5; i++) {
      const ratio = i / 5;
      const r = Math.round(91 + (96 - 91) * ratio);
      const g = Math.round(155 + (165 - 155) * ratio);
      const b = Math.round(213 + (250 - 213) * ratio);
      doc.setDrawColor(r, g, b);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition + i * 0.6, pageWidth - margin, yPosition + i * 0.6);
    }
    yPosition += 15;

    result.dealerQuestions.forEach((question, index) => {
      checkPageBreak(25);
      
      // Light gray box for each question
      const boxStartY = yPosition;
      doc.setFillColor(243, 244, 246);
      doc.roundedRect(margin, boxStartY, pageWidth - 2 * margin, 20, 4, 4, 'F');
      
      // Checkbox
      doc.setDrawColor(91, 155, 213);
      doc.setLineWidth(0.5);
      doc.rect(margin + 5, yPosition + 3, 4, 4);
      
      // Question number in blue circle badge
      doc.setFillColor(91, 155, 213);
      doc.circle(margin + 15, yPosition + 5, 3, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(`${index + 1}`, margin + 15, yPosition + 6.5, { align: 'center' });
      
      // Question text with sentence-aware formatting
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(31, 41, 55);
      const questionMaxWidth = pageWidth - 2 * margin - 28;
      const questionParagraphs = formatTextAsParagraphs(question, questionMaxWidth, doc);
      const questionEndY = drawParagraphs(doc, questionParagraphs, margin + 22, yPosition + 5, 5, 6);
      
      // Update box height based on actual content
      const boxHeight = questionEndY - boxStartY + 5;
      doc.setFillColor(243, 244, 246);
      doc.roundedRect(margin, boxStartY, pageWidth - 2 * margin, boxHeight, 4, 4, 'F');
      
      // Redraw checkbox
      doc.setDrawColor(91, 155, 213);
      doc.setLineWidth(0.5);
      doc.rect(margin + 5, boxStartY + 3, 4, 4);
      
      // Redraw badge
      doc.setFillColor(91, 155, 213);
      doc.circle(margin + 15, boxStartY + 5, 3, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(`${index + 1}`, margin + 15, boxStartY + 6.5, { align: 'center' });
      
      // Redraw question text
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(31, 41, 55);
      drawParagraphs(doc, questionParagraphs, margin + 22, boxStartY + 5, 5, 6);
      
      yPosition = boxStartY + boxHeight + 8;
    });

    addFooter();

    // Save PDF
    const timestamp = new Date().getTime();
    doc.save(`rv-technology-checklist-${timestamp}.pdf`);
  };

  const resetChecklist = () => {
    setUserInput('');
    setResult(null);
    setError('');
  };

  if (result) {
    return (
      <Card className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
        <div className="mb-8">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-full mb-4">
              <ClipboardCheck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Your Personalized RV Technology Checklist</h3>
          </div>
          <div className="text-[#E2E8FF] text-lg">{formatTextWithParagraphs(result.summary)}</div>
        </div>

        <div className="space-y-6 mb-8">
          {/* Critical Points Summary */}
          <div className="mb-6 p-5 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg border-2 border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-6 w-6 text-red-400" />
              <h4 className="text-xl font-semibold text-red-300">Critical Points - Must Address</h4>
            </div>
            <div className="space-y-3">
              {result.checklistItems
                .filter(item => item.priority === 'essential')
                .slice(0, 5)
                .map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-[#151A22]/50 rounded border border-red-500/20">
                    <span className="text-red-400 font-bold text-lg flex-shrink-0">{index + 1}.</span>
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1">{item.item}</p>
                      <p className="text-sm text-[#E2E8FF]/80 italic">
                        {item.questions[0] ? item.questions[0].split('.')[0] + '.' : item.category}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <p className="text-xs text-[#E2E8FF]/60 mt-4 italic">
              ⬇️ Scroll down for complete details on all items, budget breakdown, and dealer questions
            </p>
          </div>

          <div className="p-4 bg-[#151A22]/50 rounded-lg border border-[#1a202c]">
            <h4 className="text-xl font-semibold text-[#60A5FA] mb-2">Budget Considerations</h4>
            <div className="text-[#E2E8FF]">{formatTextWithParagraphs(result.budgetConsiderations)}</div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-[#60A5FA] mb-4">Technology Items to Research</h4>
            <div className="space-y-4">
          {result.checklistItems
            .sort((a, b) => {
              const priorityOrder = { 'essential': 1, 'important': 2, 'nice-to-have': 3 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
            .map((item, index) => (
                <div key={index} className="p-4 bg-[#151A22]/50 rounded-lg border border-[#1a202c]">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-[#5B9BD5] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h5 className="font-semibold text-white">{item.item}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.priority === 'essential' ? 'bg-red-500/20 text-red-300' :
                          item.priority === 'important' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-sm text-[#E2E8FF]/70 mb-3">{item.category}</p>
                      <div>
                        <p className="text-sm text-[#E2E8FF]/80 mb-2">Questions to ask:</p>
                        <ul className="space-y-4">
                          {item.questions.map((question, qIndex) => (
                            <li key={qIndex} className="text-sm text-[#E2E8FF]">
                              <div className="flex items-start gap-2">
                                <span className="text-[#60A5FA] flex-shrink-0 mt-1">•</span>
                                <div className="flex-1">{formatTextWithParagraphs(question, true)}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border-2 border-blue-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-6 w-6 text-blue-400" />
              <h4 className="text-xl font-semibold text-blue-300">Key Takeaways - Most Important Answers</h4>
            </div>
            <div className="space-y-3">
              {result.checklistItems
                .filter(item => item.priority === 'essential' || item.priority === 'important')
                .slice(0, 6)
                .map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-[#151A22]/50 rounded border border-blue-500/20">
                    <span className="text-blue-400 font-bold text-lg flex-shrink-0">{index + 1}.</span>
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1">{item.item}</p>
                      <p className="text-sm text-[#E2E8FF]/90">
                        {item.questions[0] || item.category}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <p className="text-xs text-[#E2E8FF]/60 mt-4 italic">
              💡 These are the most critical technology considerations based on your requirements
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#60A5FA] mb-3">General Questions for Any RV Dealer</h4>
            <ul className="space-y-4">
              {result.dealerQuestions.map((question, index) => (
                <li key={index} className="text-[#E2E8FF]">
                  <div className="flex items-start gap-2">
                    <span className="text-[#5B9BD5] flex-shrink-0 mt-1">•</span>
                    <div className="flex-1">{formatTextWithParagraphs(question, true)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Button 
            onClick={generateDownload}
            variant="outline"
            size="lg"
            className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#151A22] hover:text-white w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Checklist
          </Button>
          <ExternalLinkButton 
            href={result.searchUrls.buyUrl}
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] w-full"
          >
            Browse Matching RVs
          </ExternalLinkButton>
          <ExternalLinkButton 
            href={result.searchUrls.reviewsUrl}
            variant="outline"
            size="lg"
            className="border-[#5B9BD5]/50 text-[#5B9BD5] hover:bg-[#5B9BD5]/10 w-full"
          >
            Read Reviews
          </ExternalLinkButton>
          <ExternalLinkButton 
            href={result.searchUrls.dealersUrl}
            variant="outline"
            size="lg"
            className="border-[#5B9BD5]/50 text-[#5B9BD5] hover:bg-[#5B9BD5]/10 w-full"
          >
            Find Dealers
          </ExternalLinkButton>
          <ExternalLinkButton 
            href={result.searchUrls.priceCheckerUrl}
            variant="outline"
            size="lg"
            className="border-[#5B9BD5]/50 text-[#5B9BD5] hover:bg-[#5B9BD5]/10 w-full"
          >
            Check Prices
          </ExternalLinkButton>
          <Button 
            onClick={resetChecklist}
            variant="outline"
            size="lg"
            className="border-[#1a202c] text-[#E2E8FF] hover:bg-[#151A22] hover:text-white w-full"
          >
            New Checklist
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-[#091020] to-[#131a2a] border-[#1a202c] text-white">
      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-full">
            <div className="animate-spin w-8 h-8 border-3 border-white border-t-transparent rounded-full" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-white">Generating Your Personal Checklist...</h3>
            <p className="text-[#E2E8FF] text-sm">⏱️ This typically takes 20-40 seconds for detailed requirements</p>
            <p className="text-[#E2E8FF]/70 text-xs mt-4">Analyzing your needs and creating a customized research plan</p>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5B9BD5] to-[#60A5FA] rounded-full mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">AI Technology Research Checklist</h3>
            <p className="text-[#E2E8FF] text-lg">Get a personalized checklist of technology features to research based on your specific needs</p>
          </div>

          <Alert className="mb-6 border-[#5B9BD5]/30 bg-[#5B9BD5]/10">
            <AlertCircle className="h-4 w-4 text-[#5B9BD5]" />
            <AlertDescription className="text-[#E2E8FF]">
              This AI tool creates a custom research checklist to help you ask the right questions when shopping for RVs.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-3">
                Describe your RV plans, travel style, and what technology features you think you might need:
              </label>
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Example: We plan to travel full-time and work remotely from the RV. We'll stay in both campgrounds and boondock frequently. I need reliable internet, good power management for my equipment, and want to monitor systems while away from the RV..."
                className="min-h-32 bg-[#151A22] border-[#1a202c] text-white placeholder-[#E2E8FF]/50"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!userInput.trim()}
              className="w-full bg-gradient-to-r from-[#5B9BD5] to-[#60A5FA] hover:from-[#4B8FE3] hover:to-[#5B9BD5] text-lg py-6"
            >
              <Zap className="mr-2 h-5 w-5" />
              Generate My AI Research Checklist
            </Button>

            {error && (
              <Alert className="border-red-500 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </>
      )}
    </Card>
  );
};