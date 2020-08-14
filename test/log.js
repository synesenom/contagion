const { assert } = require('chai')
const { describe, it } = require('mocha')
const stdout = require('test-console').stdout
const log = require('../src/log')
const { useFakeTimers } = require('sinon')


describe('log', () => {
    describe('.i', () => {
        it('should print the right info message', () => {
            const i = stdout.inspectSync(() => log.i('Info message'))
            assert.deepEqual(i, ['\u001b[37mINFO [00:00:00]: Info message\u001b[39m\n'])
        })

        it('should print time in the right format', () => {
            const now = Date.now() + 12345678
            const clock = useFakeTimers(now);
            const i = stdout.inspectSync(() => log.i('Info message'))
            assert.deepEqual(i, ['\u001b[37mINFO [03:25:45]: Info message\u001b[39m\n'])
            clock.restore()
        })
    })

    describe('.e', () => {
        it('should print the right error message', () => {
            const e = stdout.inspectSync(() => log.e('Error message'))
            assert.deepEqual(e, ['\u001b[31mERRO [00:00:00]: Error message\u001b[39m\n'])
        })

        it('should print time in the right format', () => {
            const now = Date.now() + 12345678
            const clock = useFakeTimers(now);
            const e = stdout.inspectSync(() => log.e('Error message'))
            assert.deepEqual(e, ['\u001b[31mERRO [03:25:45]: Error message\u001b[39m\n'])
            clock.restore()
        })
    })
})
