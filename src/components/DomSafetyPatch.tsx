'use client';

import { useEffect } from 'react';

/**
 * Softens NotFoundError from removeChild/insertBefore when the DOM was
 * mutated outside React (browser translate, extensions, content-visibility).
 * Without this, client navigations on AR pages can white-screen.
 */
export function DomSafetyPatch() {
  useEffect(() => {
    if (typeof Node === 'undefined') return;

    const originalRemoveChild = Node.prototype.removeChild;
    const originalInsertBefore = Node.prototype.insertBefore;

    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      if (child.parentNode !== this) {
        return child;
      }
      return originalRemoveChild.call(this, child) as T;
    };

    Node.prototype.insertBefore = function <T extends Node>(
      newNode: T,
      referenceNode: Node | null,
    ): T {
      if (referenceNode && referenceNode.parentNode !== this) {
        return this.appendChild(newNode);
      }
      return originalInsertBefore.call(this, newNode, referenceNode) as T;
    };

    return () => {
      Node.prototype.removeChild = originalRemoveChild;
      Node.prototype.insertBefore = originalInsertBefore;
    };
  }, []);

  return null;
}
