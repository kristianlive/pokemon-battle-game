import React, { useEffect, useState, useRef } from 'react';
import Phaser from 'phaser';

const Game = () => {
  const [playerHealth, setPlayerHealth] = useState(100);  // Здоровье игрока
  const [enemyHealth, setEnemyHealth] = useState(100);    // Здоровье противника
  const pikachuRef = useRef(null); // Реф для хранения Pikachu

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

    let enemy;

    function preload() {
      // Загрузка ресурсов
      this.load.image('background', 'assets/desert.png');
      this.load.spritesheet('walk', 'assets/pikachu/Walk-Anim.png', { frameWidth: 32, frameHeight: 40 });
      this.load.spritesheet('attack', 'assets/pikachu/Attack-Anim.png', { frameWidth: 80, frameHeight: 80 });
    }

    function create() {
      // Установка фона
      const background = this.add.image(600, 400, 'background');
      background.setScale(1, 1);

      // Создание Pikachu и настройка анимаций
      const pikachu = this.physics.add.sprite(300, 400, 'walk');
      pikachu.setScale(4);  // Масштабирование Pikachu
      pikachuRef.current = pikachu; // Сохраняем Pikachu в рефе

      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('attack', { start: 21, end: 30 }), // Убедитесь, что номера кадров корректны
        frameRate: 15,
        repeat: 0
      });

      pikachu.play('walk');  // Запуск анимации ходьбы

      // Обработчик события завершения анимации
      pikachu.on('animationcomplete', (animation, frame) => {
        if (animation.key === 'attack') {
          console.log("Attack animation complete, switching to walk");
          pikachu.play('walk');
        }
      });

      // Создание противника
      enemy = this.add.rectangle(900, 400, 50, 50, 0xff0000);
      this.physics.add.existing(enemy);
    }

    function update() {
      // Логика обновления будет здесь
    }

    return () => {
      game.destroy(true);  // Уничтожение экземпляра игры при размонтировании
    };
  }, []);

  const handlePlayerAttack = () => {
    // Уменьшение здоровья противника на 10
    setEnemyHealth(prev => Math.max(prev - 10, 0));
    console.log("Set health initiated");

    if (pikachuRef.current) {
      pikachuRef.current.play('attack', true); // Принудительный запуск анимации атаки
      console.log("Attack animation initiated");
    }
  };

  return (
    <div>
      <div className="battle-info">
        <div>
          <h3>Здоровье игрока: {playerHealth}</h3>
        </div>
        <div>
          <h3>Здоровье противника: {enemyHealth}</h3>
        </div>
      </div>
      <div id="phaser-game"></div>
      <button onClick={handlePlayerAttack}>Атаковать противника</button>
    </div>
  );
};

export default Game;
