import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

const Game = () => {
  const [playerHealth, setPlayerHealth] = useState(100);  // Здоровье игрока
  const [enemyHealth, setEnemyHealth] = useState(100);    // Здоровье противника

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1200,
      height: 800,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    let player;
    let enemy;

    function preload() {
      // Можно загрузить спрайты покемонов, но пока начнём с квадратов
    }

    function create() {
      // Создаём двух покемонов (квадраты)
      player = this.add.rectangle(300, 400, 50, 50, 0x00ff00); // Игрок слева
      enemy = this.add.rectangle(900, 400, 50, 50, 0xff0000);  // Враг справа
      this.physics.add.existing(player);
      this.physics.add.existing(enemy);
    }

    function update() {
      // Пока что обновлять нечего, но в будущем здесь будет логика боя
    }

    return () => {
      game.destroy(true);  // Очистка игры при размонтировании
    };
  }, []);

  const handlePlayerAttack = () => {
    // Уменьшаем здоровье противника на 10
    setEnemyHealth(prev => Math.max(prev - 10, 0));
  };

  return (
    <div>
      <div className="battle-info">
        <div>
          <h3>Player Health: {playerHealth}</h3>
        </div>
        <div>
          <h3>Enemy Health: {enemyHealth}</h3>
        </div>
      </div>
      <div id="phaser-game"></div>
      <button onClick={handlePlayerAttack}>Attack Enemy</button>
    </div>
  );
};

export default Game;
