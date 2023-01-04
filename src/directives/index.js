export const imgerror = {
  inserted(el, binding) {
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
export const textcolor = {
  inserted(el, binding) {
    el.style.color = binding.value
  }
}
