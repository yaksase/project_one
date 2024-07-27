import AiCommon from '../assets/ai/ai_common.png';
import AiEpic from '../assets/ai/ai_epic.png';
import AiLegendary from '../assets/ai/ai_legendary.png';
import AiMythic from '../assets/ai/ai_mythic.png';
import AiRare from '../assets/ai/ai_rare.png';
import AiUltra from '../assets/ai/ai_ultra.png';
import AiUncommon from '../assets/ai/ai_uncommon.png';

import AiUnknown from '../assets/ai/ai_unknown.png';

export default function getAiImage(rarity = null) {
  switch (rarity) {
    case 'common':
      return AiCommon;

    case 'uncommon':
      return AiUncommon;

    case 'epic':
      return AiEpic;

    case 'legendary':
      return AiLegendary;

    case 'mythic':
      return AiMythic;

    case 'rare':
      return AiRare;

    case 'ultra':
      return AiUltra;
  
    default:
      return AiUnknown;
  }
}