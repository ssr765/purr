export interface Analysis {
  detected: boolean
  data: [
    {
      confidence: number
      coordinates: {
        x1: number
        y1: number
        x2: number
        y2: number
      }
    },
  ]
}
