import { Dictionary } from 'lodash'
import { Pieces } from '../types'

export const verticalObstructionTemplates: Dictionary<number[]> = {
  /* 
   The order really matters here.
   These number arrays' indices must line up with the templates' indices, as each hex in a terrain model might have a different height.
   And WORSE, we shifted left one hex up there ^^^ in the tile templates, so keep it straight that the
   height arrays are "starting" from the first "9" on line 2 of each comment-template below
  */
  [Pieces.ruins2]: [
    // Played with this in virtualscape, and here's how much I think each hex in the template requires for clearance:
    /* Ruins2, 10 on line 2 is the origin for rotation=0
    the X's mark Critical support hexes, these must be supported by solid underneath
    --3--
    9--10x--7x---4
   --10--10x--7--
    */
    // first the basic3
    9,
    10, 10,
    // then the two to the right
    7, 4,
    // then the two down to the right
    10, 7,
    // then the extra back hex
    3,
  ],
  [Pieces.ruins3]: [
    /* Ruins3, second 9 on line 2 is the origin for rotation=0
    the X's mark Critical support hexes, these must be supported by solid underneath
    --3--
    9---9x----8x---7---3
    ---9---8x---8---7--
    */
    // so first the basic-3
    9, 9, 9,
    // then the two to the right
    8, 7,
    // then the two down to the right
    8, 8,
    // then the far right and far down-right of wallWalk9
    3, 7,
    // then the extra back hex
    3,
  ],
}
export const verticalSupportTemplates: Dictionary<number[]> = {
  /* 
   The order really matters here.
   These number arrays' indices must line up with the templates' indices, much like the verticalObstructionTemplates and implemented shortly after them.
  */
  [Pieces.ruins2]: [
    // Eyeballed this and performed a physical thought experiment remembering all the times I built a map with ruins and how the middle just needed to be supported
    /* Ruins2, 10 on line 2 is the origin for rotation=0
    the X's mark Critical support hexes, these must be supported by solid underneath
    --3--
    9--10x--7x---4
   --10--10x--7--
    */
    // first the basic3
    0,
    1, 0,
    // then the two to the right
    1, 0,
    // then the two down to the right
    1, 0,
    // then the extra back hex
    0,
  ],
  [Pieces.ruins3]: [
    /* Ruins3, second 9 on line 2 is the origin for rotation=0
    the X's mark Critical support hexes, these must be supported by solid underneath
    --3--
    9---9x----8x---7---3
    ---9---8x---8---7--
    */
    // so first the basic-3
    0, 1, 0,
    // then the two to the right
    1, 0,
    // then the two down to the right
    1, 0,
    // then the far right and far down-right of wallWalk9
    0, 0,
    // then the extra back hex
    0,
  ],
}
export const interiorHexTemplates: Dictionary<number[]> = {
  /* 
   The order really matters here.
   These number arrays' indices must line up with the templates' indices, much like the verticalObstructionTemplates and implemented shortly after them.
  */
  [Pieces.ruins2]: [
    /* the i's mark the interior hexes
    --3--
    9--10i--7i---4
   --10--10--7--
    */
    // A value of "2"  means origin, "1" means auxiliary
    // first the basic3
    0, 2, 0,
    // then the two to the right
    1, 0,
    // then the two down to the right
    0, 0,
    // then the extra back hex
    0,
  ],
  [Pieces.ruins3]: [
    /* the i's mark the interior hexes
    --3--
    9---9i----8i---7i---3
    ---9---8---8---7--
    */
    // A value of "2"  means origin, "1" means auxiliary
    // so first the basic-3
    0, 2, 0,
    // then the two to the right
    1, 1,
    // then the two down to the right
    0, 0,
    // then the far right and far down-right of wallWalk9
    0, 0,
    // then the extra back hex
    0,
  ],
}
