
/**
 * DOM Performance utilities to prevent forced reflows
 * Batches DOM reads and writes using requestAnimationFrame
 */

interface DOMRead {
  element: Element;
  property: string;
  callback: (value: any) => void;
}

interface DOMWrite {
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
  read(element: Element, property: string, callback: (value: any) => void): void {
    this.reads.push({ element, property, callback });
    this.schedule();
  }

  /**
   * Schedule a DOM write operation
   */
  write(element: HTMLElement, styles: Record<string, string>, callback?: () => void): void {
    this.writes.push({ element, styles, callback });
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
    const readResults: any[] = [];
    
    this.reads.forEach((read, index) => {
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
          case 'scrollTop':
            value = (read.element as HTMLElement).scrollTop;
            break;
          default:
            value = (read.element as any)[read.property];
        }
        readResults[index] = value;
      } catch (error) {
        console.warn('DOM read error:', error);
        readResults[index] = undefined;
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
    this.reads.forEach((read, index) => {
      const result = readResults[index];
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
