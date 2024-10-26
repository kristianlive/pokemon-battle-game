import React, { useEffect, useState, useRef } from 'react';
import Phaser from 'phaser';
import characterControls from '../utils/characterControls';

const Game = () => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const pikachuRef = useRef(null);
  let cursors;
  let enemy;  // Объявляем переменную enemy на уровне useEffect

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

    function preload() {
      // Загрузка фона и анимаций
      this.load.image('background', 'assets/desert.png');
      this.load.spritesheet('walk', 'assets/pikachu/Walk-Anim.png', { frameWidth: 32, frameHeight: 40 });
      this.load.spritesheet('attack', 'assets/pikachu/Attack-Anim.png', { frameWidth: 80, frameHeight: 80 });
    }

    function create() {
      // Настройка фона
      const background = this.add.image(600, 400, 'background');
      background.setScale(1, 1);

      // Создаем Пикачу и настраиваем его анимации
      const pikachu = this.physics.add.sprite(300, 400, 'walk');
      pikachu.setScale(4);
      pikachuRef.current = pikachu; // Сохраняем ссылку на Пикачу

      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'idle',
        frames: [{ key: 'walk', frame: 0 }],
        frameRate: 10
      });

      this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('attack', { start: 21, end: 30 }),
        frameRate: 15,
        repeat: 0
      });

      pikachu.play('idle');  // Начинаем с анимации "стоя на месте"

      // Обработчик завершения анимации
      pikachu.on('animationcomplete', (animation) => {
        if (animation.key === 'attack') {
          pikachu.play('idle'); // Возвращаемся к "idle" после атаки
        }
      });
      

      // Создаем врага
      enemy = this.add.rectangle(900, 400, 50, 50, 0xff0000);
      this.physics.add.existing(enemy);

      // Настройка клавиш управления
      cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
      if (pikachuRef.current && cursors) {
        characterControls(pikachuRef.current, cursors, { walk: 'walk', idle: 'idle' });
      }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  const handlePlayerAttack = () => {
    // Уменьшаем здоровье противника
    setEnemyHealth(prev => Math.max(prev - 10, 0));
  
    if (pikachuRef.current) {
      // Проигрываем анимацию атаки
      pikachuRef.current.play('attack', true);
    }
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
