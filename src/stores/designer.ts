import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface DesignElement {
  id: string
  type: 'text' | 'image' | 'shape' | 'sticker'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  content: string
  style: Record<string, string>
}

export interface Design {
  id: string
  name: string
  elements: DesignElement[]
  createdAt: Date
  updatedAt: Date
}

export const useDesignerStore = defineStore('designer', () => {
  const currentDesign = ref<Design | null>(null)
  const selectedElementId = ref<string | null>(null)
  const isDragging = ref(false)
  const zoom = ref(1)

  function createNewDesign() {
    currentDesign.value = {
      id: `design-${Date.now()}`,
      name: `设计 #${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      elements: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  function addElement(element: Omit<DesignElement, 'id'>) {
    if (!currentDesign.value) return
    const newElement: DesignElement = {
      ...element,
      id: `element-${Date.now()}`,
    }
    currentDesign.value.elements.push(newElement)
    currentDesign.value.updatedAt = new Date()
    selectedElementId.value = newElement.id
  }

  function updateElement(id: string, updates: Partial<DesignElement>) {
    if (!currentDesign.value) return
    const element = currentDesign.value.elements.find(el => el.id === id)
    if (element) {
      Object.assign(element, updates)
      currentDesign.value.updatedAt = new Date()
    }
  }

  function deleteElement(id: string) {
    if (!currentDesign.value) return
    currentDesign.value.elements = currentDesign.value.elements.filter(el => el.id !== id)
    if (selectedElementId.value === id) {
      selectedElementId.value = null
    }
  }

  function selectElement(id: string | null) {
    selectedElementId.value = id
  }

  return {
    currentDesign,
    selectedElementId,
    isDragging,
    zoom,
    createNewDesign,
    addElement,
    updateElement,
    deleteElement,
    selectElement,
  }
})
