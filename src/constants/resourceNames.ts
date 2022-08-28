export const resNames = ['material', 'energy', 'ammunition'] as const

export const resProds = ['materialProd', 'energyProd', 'ammunitionProd']

export const resProdMap = {
    materialProd: 'material',
    energyProd: 'energy',
    ammunitionProd: 'ammunition',
} as const

export const poNames = ['playerOneName', 'playerTwoName'] as const

export const allStatusNames = [
  'health',
  'hull',
  'material',
  'energy',
  'ammunition',
  'materialProd',
  'energyProd',
  'ammunitionProd',
] as const

export const resNameAllMap = {
  material: ['material', 'materialProd'],
  energy: ['energy', 'energyProd'],
  ammunition: ['ammunition', 'ammunitionProd'],
} as const

export type ResNameType = 'material' | 'energy' | 'ammunition'