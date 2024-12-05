<template>
  <div class="profile-page">
    <div class="sidebar">
      <ul>
        <li :class="{ active: currentView === 'profile' }" @click="currentView = 'profile'">个人信息展示</li>
        <li :class="{ active: currentView === 'editProfile' }" @click="currentView = 'editProfile'">修改个人信息</li>
      </ul>
    </div>
    <div class="content">
      <div v-if="currentView === 'profile'">
        <h2>个人信息</h2>
        <div class="info">
          <p><strong>用户名:</strong> {{ user.username }}</p>
          <p><strong>邮箱:</strong> {{ user.email }}</p>
          <p><strong>性别:</strong> {{ user.gender }}</p>
          <p><strong>出生日期:</strong> {{ user.birthDate }}</p>
          <p><strong>地区:</strong> {{ user.location }}</p>
        </div>
      </div>
      <div v-else-if="currentView === 'editProfile'">
        <h2>修改个人信息</h2>
        <form @submit.prevent="handleUpdate" class="edit-form">
          <div class="form-item">
            <label>用户名</label>
            <input v-model="user.username" placeholder="请输入用户名" />
          </div>
          <div class="form-item">
            <label>邮箱</label>
            <input v-model="user.email" placeholder="请输入邮箱" />
          </div>
          <div class="form-item">
            <label>新密码</label>
            <input type="password" v-model="password" placeholder="请输入新密码" />
          </div>
          <div class="form-item">
            <label>性别</label>
            <select v-model="user.gender">
              <option value="男">男</option>
              <option value="女">女</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div class="form-item">
            <label>出生日期</label>
            <input type="date" v-model="user.birthDate" />
          </div>
          <div class="form-item">
            <label>地区</label>
            <input v-model="user.location" placeholder="请输入地区" />
          </div>
          <button type="submit">更新信息</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

const route = useRoute();
const currentView = ref('profile');
const userId = ref('');
const user = ref({
  username: '',
  email: '',
  gender: '',
  birthDate: '',
  location: '',
});
const password = ref('');

// 使用 watch 监视路由参数变化
watch(() => route.params.username, async (newUsername) => {
  await fetchUserInfo(newUsername);
});

// 获取用户信息函数
// 获取用户信息函数
const fetchUserInfo = async (username) => {
  try {
    const encodedUsername = encodeURIComponent(username);
const response = await axios.get(`http://localhost:2000/api/user?username=${encodedUsername}`);

    
    const userData = response.data;
    userId.value = userData.user_id;
    user.value.username = userData.user_Name;
    user.value.email = userData.user_Email;
    user.value.gender = userData.user_Gender || '';
    user.value.birthDate = userData.user_BirthDate ? userData.user_BirthDate.split('T')[0] : '';
    user.value.location = userData.user_Location || '';
  } catch (error) {
    console.error('获取用户信息失败:', error);
    message.error('获取用户信息失败，请稍后重试');
  }
};


// 组件挂载时立即获取用户信息
onMounted(async () => {
  await fetchUserInfo(route.params.username);
});

// 更新用户信息
const handleUpdate = async () => {
  try {
    const updatedInfo = {
      userId: userId.value,
      username: user.value.username,
      email: user.value.email,
      password: password.value,
      gender: user.value.gender,
      birthDate: user.value.birthDate,
      location: user.value.location,
    };

    await axios.put('http://localhost:2000/api/user/update', updatedInfo);

    alert('信息更新成功');
  } catch (error) {
    console.error('信息更新失败:', error);
    alert('信息更新失败');
  }
};

</script>

<style scoped>
.profile-page {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
}

.sidebar li.active {
  font-weight: bold;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.info {
  margin-top: 20px;
}

.edit-form {
  margin-top: 20px;
}

.form-item {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
}
</style>
