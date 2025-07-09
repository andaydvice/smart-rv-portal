
import { StorageFacility } from '@/components/storage/types';
import mapboxgl from 'mapbox-gl';

declare global {
  interface Window {
    _persistentMarkers?: Record<string, mapboxgl.Marker>;
    isStorageFacilitiesPage?: boolean;
    mapInstance?: mapboxgl.Map;
    mapFacilities?: StorageFacility[];
    isRVWeatherPage?: boolean;
    pageStartTime?: number;
    SpeechRecognition?: new() => SpeechRecognition;
    webkitSpeechRecognition?: new() => SpeechRecognition;
    gtag?: (...args: unknown[]) => void;
  }
  
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
    onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  }
  
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
  }
  
  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }
  
  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }
  
  interface SpeechRecognitionResult {
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
  }
  
  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }
}

export {};
