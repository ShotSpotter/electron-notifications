const electron = require('electron')
const EventEmitter = require('events')

const { remote } = electron

class ClickBehavior extends EventEmitter {
  constructor (element) {
    super()
    var clicked = (e) => {

      console.log('click', e);

    };

    this.mainWindow = remote.getCurrentWindow()


    this.mainWindow.on('move', this.move.bind(this))
    this.clicks = this.moves = 0
    console.log('adding click handler');
    console.log("element", element);
    element.onclick = clicked 

    element.addEventListener('click', clicked);
    element.addEventListener('click', this.click.bind(this))

  }

  checkClick () {
    if (this.clicks !== this.moves) {
      this.clicks = this.moves = 0
      this.emit('behavior', 'clicked')
    } else {
      console.log('failed click/move check');
    }
  }

  move () {
    this.moves++
  }

  click (event) {
    console.log('click', event);
    if (event.target.tagName === 'A') {
      return;
    }
    this.clicks++
    clearTimeout(this.timeout)
    this.timeout = setTimeout(this.checkClick.bind(this), 150)
  }
}

module.exports = ClickBehavior
