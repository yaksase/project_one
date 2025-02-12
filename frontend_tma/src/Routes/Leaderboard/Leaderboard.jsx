import PropTypes from 'prop-types';

import PopUp from '../../Components/PopUp/PopUp';

import tokenIcon from '../../assets/token_icon.png';

import s from './Leaderboard.module.css';

Leaderboard.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default function Leaderboard({ isActive, onClose }) {
  const userList = [
    {
      id: 1,
      name: 'bob',
      tokens: 1234
    },
    {
      id: 2,
      name: 'lol',
      tokens: 123
    },
    {
      id: 3,
      name: 'francua modi dick lil uzi vert diamond',
      tokens: 98765432445
    },
    {
      id: 4,
      name: 'lil morty',
      tokens: 432
    },
    {
      id: 5,
      name: 'jesus',
      tokens: 0
    },
    {
      id: 1,
      name: 'bob',
      tokens: 1234
    },
    {
      id: 2,
      name: 'lol',
      tokens: 123
    },
    {
      id: 3,
      name: 'francua modi dick lil uzi vert diamond',
      tokens: 98765432445
    },
    {
      id: 4,
      name: 'lil morty',
      tokens: 432
    },
    {
      id: 1,
      name: 'bob',
      tokens: 1234
    },
    {
      id: 2,
      name: 'lol',
      tokens: 123
    },
    {
      id: 3,
      name: 'francua modi dick lil uzi vert diamond',
      tokens: 98765432445
    },
    {
      id: 4,
      name: 'lil morty',
      tokens: 432
    },
    {
      id: 1,
      name: 'bob',
      tokens: 1234
    },
    {
      id: 2,
      name: 'lol',
      tokens: 123
    },
    {
      id: 3,
      name: 'francua modi dick lil uzi vert diamond',
      tokens: 98765432445
    },
    {
      id: 4,
      name: 'lil morty',
      tokens: 432
    },
    {
      id: 1,
      name: 'bob',
      tokens: 1234
    },
    {
      id: 2,
      name: 'lol',
      tokens: 123
    },
    {
      id: 3,
      name: 'francua modi dick lil uzi vert diamond',
      tokens: 98765432445
    },
    {
      id: 4,
      name: 'lil morty',
      tokens: 432
    },
    {
      id: 1,
      name: 'bob',
      tokens: 1234
    },
    {
      id: 2,
      name: 'lol',
      tokens: 123
    },
    {
      id: 3,
      name: 'francua modi dick lil uzi vert diamond',
      tokens: 98765432445
    },
    {
      id: 4,
      name: 'lil morty',
      tokens: 432
    },
    {
      id: 1,
      name: 'bob',
      tokens: 1234
    },
    {
      id: 2,
      name: 'lol',
      tokens: 123
    },
    {
      id: 3,
      name: 'francua modi dick lil uzi vert diamond',
      tokens: 98765432445
    },
    {
      id: 4,
      name: 'lil morty',
      tokens: 432
    },
    {
      id: 1,
      name: 'bob',
      tokens: 1234
    },
    {
      id: 2,
      name: 'lol',
      tokens: 123
    },
    {
      id: 3,
      name: 'francua modi dick lil uzi vert diamond',
      tokens: 98765432445
    },
    {
      id: 4,
      name: 'lil morty',
      tokens: 432
    },
    {
      id: 1,
      name: 'bob',
      tokens: 1234
    },
    {
      id: 2,
      name: 'lol',
      tokens: 123
    },
    {
      id: 3,
      name: 'francua modi dick lil uzi vert diamond',
      tokens: 98765432445
    },
    {
      id: 4,
      name: 'lil morty',
      tokens: 432
    },
    {
      id: 1,
      name: 'bob',
      tokens: 1234
    },
    {
      id: 2,
      name: 'lol',
      tokens: 123
    },
    {
      id: 3,
      name: 'francua modi dick lil uzi vert diamond',
      tokens: 98765432445
    },
    {
      id: 4,
      name: 'lil morty',
      tokens: 432
    },
  ];

  return (
    <PopUp isActive={isActive} onClose={onClose}>
      <div className={s.leaderboardPopUp}>
        <span className={s.leaderboardTitle}>Leaderboard</span>
        <div className={s.usersList}>
          {
            userList.map((user, index) => (
              <div key={index} className={s.leaderboardItem}>
                <div className={s.itemPlace}>
                  {index + 1}
                </div>
                <div className={s.itemDescription}>
                  {user.name} {user.tokens} <span className={`priceWrapper`}><img src={tokenIcon}></img></span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </PopUp>
  )
}