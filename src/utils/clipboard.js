/**
 * 剪贴板工具类
 */
export class ClipboardUtils {
  /**
   * 复制文本到剪贴板
   * @param {string} text - 要复制的文本
   * @returns {Promise<boolean>} - 复制是否成功
   */
  static async copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // 优先使用现代 Clipboard API
        await navigator.clipboard.writeText(text);
      } else {
        // 降级使用传统方法
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      return true;
    } catch (err) {
      console.error('复制失败:', err);
      return false;
    }
  }
}