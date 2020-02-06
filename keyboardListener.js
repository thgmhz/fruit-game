export default function createKeyboardListener(document) {
  const state = {
    observers: [],
  }

  function subscribe(observerFn) {
    state.observers.push(observerFn)
  }

  function notifyAll(command) {
    for(const observerFn of state.observers) {
      observerFn(command)
    }
  }

  document.addEventListener('keydown', handleKeyDown)

  function handleKeyDown (e) {
    const command = {
      id: 'thiago',
      keyPressed: event.key,
    }

    notifyAll(command)
  }

  return {
    subscribe
  }
}