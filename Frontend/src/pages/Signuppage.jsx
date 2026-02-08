import React from 'react'
import './Signuppage.css'

const Signuppage = () => {
  return (
    <div className='signup-container'>
      <div className='signup-card'>
        <div className='signup-banner'>
          <div className='signup-banner-content'>
            <div className='signup-banner-icon'>🧠</div>
            <h2 className='signup-banner-title'>Welcome to LLM Quiz!</h2>
            <p className='signup-banner-text'>
              Test your knowledge with AI-powered quizzes. Learn, compete, and grow smarter every day.
            </p>
            <div className='signup-banner-dots'>
              <span className='signup-banner-dot active'></span>
              <span className='signup-banner-dot'></span>
              <span className='signup-banner-dot'></span>
            </div>
          </div>
        </div>
        <div className='signup-form-container'>
          <h1 className='signup-title'>Create Account</h1>
          <p className='signup-subtitle'>Join thousands of learners today</p>
          <form>
            <div className='signup-form-group'>
              <label className='signup-label' htmlFor='firstname'>First Name</label>
              <input className='signup-input' type='text' id='firstname' name='firstname' placeholder='John' />
            </div>
            <div className='signup-form-group'>
              <label className='signup-label' htmlFor='lastname'>Last Name</label>
              <input className='signup-input' type='text' id='lastname' name='lastname' placeholder='Doe' />
            </div>
            <div className='signup-form-group'>
              <label className='signup-label' htmlFor='email'>Email</label>
              <input className='signup-input' type='email' id='email' name='email' placeholder='john@example.com' />
            </div>
            <div className='signup-form-group'>
              <label className='signup-label' htmlFor='password'>Password</label>
              <input className='signup-input' type='password' id='password' name='password' placeholder='••••••••' />
            </div>
            <button type='submit' className='signup-button'>
              Get Started
            </button>
          </form>
          <p className='signup-footer'>
            Already have an account? <a href='/login'>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signuppage