import React from 'react'
import './Loginpage.css'

const Loginpage = () => {
  return (
    <div className='login-container'>
      <div className='login-card'>
        <div className='login-banner'>
          <div className='login-banner-content'>
            <div className='login-banner-icon'>👋</div>
            <h2 className='login-banner-title'>Welcome Back!</h2>
            <p className='login-banner-text'>
              Ready to challenge yourself? Login and continue your learning journey with AI-powered quizzes.
            </p>
            <div className='login-banner-dots'>
              <span className='login-banner-dot'></span>
              <span className='login-banner-dot active'></span>
              <span className='login-banner-dot'></span>
            </div>
          </div>
        </div>
        <div className='login-form-container'>
          <h1 className='login-title'>Sign In</h1>
          <p className='login-subtitle'>Enter your credentials to continue</p>
          <form>
            <div className='login-form-group'>
              <label className='login-label' htmlFor='email'>Email</label>
              <input className='login-input' type='email' id='email' name='email' placeholder='john@example.com' />
            </div>
            <div className='login-form-group'>
              <label className='login-label' htmlFor='password'>Password</label>
              <input className='login-input' type='password' id='password' name='password' placeholder='••••••••' />
            </div>
            <div className='login-forgot'>
              <a href='/forgot-password'>Forgot password?</a>
            </div>
            <button type='submit' className='login-button'>
              Sign In
            </button>
          </form>
          <p className='login-footer'>
            Don't have an account? <a href='/signup'>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loginpage