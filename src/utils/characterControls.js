// src/utils/characterControls.js

function characterControls(character, cursors, animations = { walk: 'walk', idle: 'idle' }) {
    if (!character) return;
  
    // Проверяем, воспроизводится ли анимация атаки
    if (character.anims.currentAnim && character.anims.currentAnim.key === 'attack') {
      return; // Если да, ничего не делаем
    }
  
    // Сбрасываем скорость
    character.setVelocity(0);
  
    // Управление по оси X
    if (cursors.left.isDown) {
      character.setVelocityX(-160);
      character.play(animations.walk, true);
      character.flipX = true;
    } else if (cursors.right.isDown) {
      character.setVelocityX(160);
      character.play(animations.walk, true);
      character.flipX = false;
    }
  
    // Управление по оси Y
    if (cursors.up.isDown) {
      character.setVelocityY(-160);
      character.play(animations.walk, true);
    } else if (cursors.down.isDown) {
      character.setVelocityY(160);
      character.play(animations.walk, true);
    }
  
    // Если персонаж не движется
    if (
      !cursors.left.isDown &&
      !cursors.right.isDown &&
      !cursors.up.isDown &&
      !cursors.down.isDown
    ) {
      character.play(animations.idle, true);
    }
  }
  
  export default characterControls;
  