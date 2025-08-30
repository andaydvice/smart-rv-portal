/**
 * DOM Performance utilities to prevent forced reflows
 * Batches DOM reads and writes using requestAnimationFrame
 */

interface DOMRead {
  id: string;
  element: Element;
  property: string;
  callback: (value: any) => void;
}

interface DOMWrite {
  id: string;
  element: HTMLElement;
  styles: Record<string, string>;
  callback?: () => void;
}

class DOMBatcher {
  private reads: DOMRead[] = [];
  private writes: DOMWrite[] = [];
  private scheduled = false;

  /**
   * Schedule a DOM read operation
   */
  read(element: Element, property: string, callback: (value: any) => void, id = Math.random().toString()): void {
    this.reads.push({ id, element, property, callback });
    this.schedule();
  }

  /**
   * Schedule a DOM write operation
   */
  write(element: HTMLElement, styles: Record<string, string>, callback?: () => void, id = Math.random().toString()): void {
    this.writes.push({ id, element, styles, callback });
    this.schedule();
  }

  /**
   * Schedule the batch execution
   */
  private schedule(): void {
    if (this.scheduled) return;
    
    this.scheduled = true;
    requestAnimationFrame(() => this.flush());
  }

  /**
   * Execute all batched operations
   */
  private flush(): void {
    // First, perform all reads
    const readResults = new Map<string, any>();
    
    this.reads.forEach(read => {
      try {
        let value;
        switch (read.property) {
          case 'offsetWidth':
            value = (read.element as HTMLElement).offsetWidth;
            break;
          case 'offsetHeight':
            value = (read.element as HTMLElement).offsetHeight;
            break;
          case 'getBoundingClientRect':
            value = read.element.getBoundingClientRect();
            break;
          case 'scrollWidth':
            value = (read.element as HTMLElement).scrollWidth;
            break;
          case 'scrollHeight':
            value = (read.element as HTMLElement).scrollHeight;
            break;
          default:
            value = (read.element as any)[read.property];
        }
        readResults.set(read.id, value);
      } catch (error) {
        console.warn('DOM read error:', error);
      }
    });

    // Then, perform all writes
    this.writes.forEach(write => {
      try {
        Object.assign(write.element.style, write.styles);
        write.callback?.();
      } catch (error) {
        console.warn('DOM write error:', error);
      }
    });

    // Finally, execute read callbacks
    this.reads.forEach(read => {
      const result = readResults.get(read.id);
      if (result !== undefined) {
        read.callback(result);
      }
    });

    // Clear batches
    this.reads = [];
    this.writes = [];
    this.scheduled = false;
  }

  /**
   * Clear all pending operations
   */
  clear(): void {
    this.reads = [];
    this.writes = [];
    this.scheduled = false;
  }
}

// Global DOM batcher instance
export const domBatcher = new DOMBatcher();

/**
 * Batch DOM reads to prevent forced reflows
 */
export const batchDOMReads = (reads: Array<{ element: Element; property: string; callback: (value: any) => void }>) => {
  reads.forEach(({ element, property, callback }) => {
    domBatcher.read(element, property, callback);
  });
};

/**
 * Batch DOM writes to prevent forced reflows
 */
export const batchDOMWrites = (writes: Array<{ element: HTMLElement; styles: Record<string, string>; callback?: () => void }>) => {
  writes.forEach(({ element, styles, callback }) => {
    domBatcher.write(element, styles, callback);
  });
};

/**
 * Utility functions for common DOM operations that prevent forced reflows
 */

/**
 * Get element dimensions without causing forced reflow
 */
export const getDimensions = (element: Element): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    domBatcher.read(element, 'getBoundingClientRect', (rect: DOMRect) => {
      resolve({ width: rect.width, height: rect.height });
    });
  });
};

/**
 * Set styles without causing forced reflow
 */
export const setStyles = (element: HTMLElement, styles: Record<string, string>): Promise<void> => {
  return new Promise((resolve) => {
    domBatcher.write(element, styles, () => resolve());
  });
};

/**
 * Check if element is in viewport without forced reflow
 */
export const isInViewport = (element: Element): Promise<boolean> => {
  return new Promise((resolve) => {
    domBatcher.read(element, 'getBoundingClientRect', (rect: DOMRect) => {
      const isVisible = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      resolve(isVisible);
    });
  });
};

/**
 * Measure text width without forced reflow
 */
export const measureText = (text: string, font: string): Promise<number> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = font;
      const width = context.measureText(text).width;
      resolve(width);
    } else {
      resolve(0);
    }
  });
};

/**
 * Debounced resize handler to prevent excessive reflow
 */
export const createResizeHandler = (callback: () => void, delay = 16): (() => void) => {
  let timeoutId: number;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      requestAnimationFrame(callback);
    }, delay);
  };
};

/**
 * IntersectionObserver-based viewport detection (preferred method)
 */
export const createViewportObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};
