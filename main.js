var obsidian = require('obsidian');

const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

class TimestampHotkeysPlugin extends obsidian.Plugin {
	async onload() {
		this.addCommand({
			id: 'timestamp-full',
			name: 'Write full timestamp',
			hotkeys: [{
				modifiers: ['Mod', 'Shift'],
				key: 'l',
			}],
			editorCallback: async (editor, view) => {
				const cursor = editor.getCursor();

				const currentTime = `(${toISOStringWithTimezone(new Date())}) `;
				
				editor.replaceRange(currentTime, cursor);
				editor.setCursor({...cursor, ch: cursor.ch + currentTime.length});
			},
		});
	}
}

module.exports = TimestampHotkeysPlugin;
