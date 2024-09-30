<template>
  <div class="contact">
    <h1>联系我</h1>
    <div class="contact-content">
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">姓名</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="message">消息</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit" class="submit-btn">发送消息</button>
      </form>
      <div class="contact-info">
        <h2>联系方式</h2>
        <p><i class="fas fa-envelope"></i> jieralt@163.com</p>
        <p><i class="fas fa-phone"></i> +86 178 5326 6379</p>
        <p><i class="fas fa-map-marker-alt"></i> 山东省潍坊市坊子区文化南路天润清园小区</p>
        <div class="social-links">
          <a href="#" target="_blank"><i class="fab fa-github"></i></a>
          <a href="#" target="_blank"><i class="fab fa-linkedin"></i></a>
          <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactMe',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // 这里添加表单提交逻辑
      console.log('Form submitted:', this.form);
      // 重置表单
      this.form = { name: '', email: '', message: '' };
      // 显示成功消息（在实际应用中，您可能想使用一个更优雅的通知系统）
      alert('消息已发送！');
    }
  }
}
</script>

<style scoped>
.contact {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.contact-content {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.contact-form {
  flex: 1;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 150px;
}

.submit-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #2980b9;
}

.contact-info {
  flex: 1;
}

.social-links {
  margin-top: 1rem;
}

.social-links a {
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #3498db;
}
</style>