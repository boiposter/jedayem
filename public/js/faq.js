/**
 * Jedayem — FAQ Page Logic
 */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
});
