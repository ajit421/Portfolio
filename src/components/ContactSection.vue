<script setup>
import { ref, reactive } from 'vue'
import { Mail, Phone, Github, Linkedin, Send, Copy, Check } from 'lucide-vue-next'
import emailjs from '@emailjs/browser'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null) // 'success' | 'error' | null
const statusMessage = ref('')
const emailCopied = ref(false)

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ajit.info999@gmail.com',
    link: 'mailto:ajit.info999@gmail.com',
    copyable: true
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 6205607900',
    link: 'tel:+916205607900'
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/ajit421',
    link: 'https://github.com/ajit421'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ajit7900',
    link: 'https://linkedin.com/in/ajit7900'
  }
]

const validateField = (field) => {
  switch (field) {
    case 'name':
      errors.name = form.name.trim() ? '' : 'Name is required'
      break
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      errors.email = !form.email.trim() ? 'Email is required' : 
                     !emailRegex.test(form.email) ? 'Invalid email format' : ''
      break
    case 'subject':
      errors.subject = form.subject.trim() ? '' : 'Subject is required'
      break
    case 'message':
      errors.message = !form.message.trim() ? 'Message is required' :
                       form.message.trim().length < 10 ? 'Message must be at least 10 characters' : ''
      break
  }
}

const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('subject')
  validateField('message')
  return !errors.name && !errors.email && !errors.subject && !errors.message
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('ajit.info999@gmail.com')
    emailCopied.value = true
    setTimeout(() => {
      emailCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitStatus.value = null

  try {
    // EmailJS configuration
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

    // Check if EmailJS is configured
    if (serviceId === 'YOUR_SERVICE_ID' || !serviceId) {
      throw new Error('EmailJS not configured. Please add credentials to .env file.')
    }

    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message
      },
      publicKey
    )

    submitStatus.value = 'success'
    statusMessage.value = 'Thank you! Your message has been sent successfully.'
    
    // Reset form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    console.error('EmailJS error:', error)
    submitStatus.value = 'error'
    statusMessage.value = error.message || 'Failed to send message. Please try again or contact directly via email.'
  } finally {
    isSubmitting.value = false
    setTimeout(() => {
      submitStatus.value = null
    }, 5000)
  }
}
</script>

<template>
  <section id="contact" class="py-20 bg-gray-50 dark:bg-dark-background/50 transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
        <div class="w-16 h-1 bg-primary mx-auto rounded-full mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                @blur="validateField('name')"
                type="text"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-background text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                :class="{ 'border-red-500': errors.name }"
                placeholder="Your Name"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                @blur="validateField('email')"
                type="email"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-background text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                :class="{ 'border-red-500': errors.email }"
                placeholder="your.email@example.com"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject <span class="text-red-500">*</span>
              </label>
              <input
                id="subject"
                v-model="form.subject"
                @blur="validateField('subject')"
                type="text"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-background text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                :class="{ 'border-red-500': errors.subject }"
                placeholder="What's this about?"
              />
              <p v-if="errors.subject" class="mt-1 text-sm text-red-500">{{ errors.subject }}</p>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                @blur="validateField('message')"
                rows="5"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-background text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                :class="{ 'border-red-500': errors.message }"
                placeholder="Your message here..."
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send class="w-5 h-5" :class="{ 'animate-pulse': isSubmitting }" />
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>

            <!-- Status Messages -->
            <Transition name="fade">
              <div v-if="submitStatus" :class="[
                'p-4 rounded-lg',
                submitStatus === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              ]">
                {{ statusMessage }}
              </div>
            </Transition>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-6">
          <div class="bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
            <div class="space-y-4">
              <div
                v-for="info in contactInfo"
                :key="info.label"
                class="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <div class="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <component :is="info.icon" class="w-6 h-6 text-primary" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ info.label }}</p>
                  <a
                    v-if="!info.copyable"
                    :href="info.link"
                    target="_blank"
                    class="text-gray-900 dark:text-white font-medium hover:text-primary transition-colors"
                  >
                    {{ info.value }}
                  </a>
                  <div v-else class="flex items-center gap-2">
                    <span class="text-gray-900 dark:text-white font-medium">{{ info.value }}</span>
                    <button
                      @click="copyEmail"
                      class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      title="Copy email"
                    >
                      <component :is="emailCopied ? Check : Copy" class="w-4 h-4" :class="emailCopied ? 'text-green-500' : 'text-gray-500'" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Info -->
          <div class="bg-gradient-to-br from-primary/10 to-accent-success/10 p-8 rounded-xl border border-primary/20">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Let's Build Something Amazing!</h3>
            <p class="text-gray-600 dark:text-gray-400">
              I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
