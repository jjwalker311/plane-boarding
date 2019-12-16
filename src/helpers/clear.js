/**
 * Special octal literal to clear console
 */
function clear() {
    console.log('\033[2J')
}

module.exports = clear
