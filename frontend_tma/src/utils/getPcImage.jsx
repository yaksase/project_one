import PcCommon from '../assets/pc/pc_common.png';
import PcEpic from '../assets/pc/pc_epic.png';
import PcLegendary from '../assets/pc/pc_legendary.png';
import PcMythic from '../assets/pc/pc_mythic.png';
import PcRare from '../assets/pc/pc_rare.png';
import PcUltra from '../assets/pc/pc_ultra.png';
import PcUncommon from '../assets/pc/pc_uncommon.png';

import PcUnknown from '../assets/pc/pc_unknown.png';

export default function getPcImage(rarity = null) {
  switch (rarity) {
    case 'common':
      return PcCommon;

    case 'uncommon':
      return PcUncommon;

    case 'epic':
      return PcEpic;

    case 'legendary':
      return PcLegendary;

    case 'mythic':
      return PcMythic;

    case 'rare':
      return PcRare;

    case 'ultra':
      return PcUltra;
  
    default:
      return PcUnknown;
  }
}