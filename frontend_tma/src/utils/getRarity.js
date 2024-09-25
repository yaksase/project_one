export default function getRarity(rarity_id = null) {
  switch (rarity_id) {
    case 0:
      return 'common';
    case 1:
      return 'uncommon';
    case 2:
      return 'epic';
    case 3:
      return 'legendary';
    case 4:
      return 'mythic';
    case 5:
      return 'rare';
    case 6:
      return 'ultra';
    default:
      return null;
  }
}