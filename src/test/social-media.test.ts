import { describe, it, expect } from 'vitest'
import { socialMedia, openSocialMedia } from '@/lib/social-media'

describe('Social Media Configuration', () => {
  it('should have all required platforms', () => {
    expect(socialMedia).toHaveProperty('facebook')
    expect(socialMedia).toHaveProperty('instagram')
    expect(socialMedia).toHaveProperty('twitter')
    expect(socialMedia).toHaveProperty('youtube')
    expect(socialMedia).toHaveProperty('linkedin')
  })

  it('should have correct handles for samattafoundation', () => {
    expect(socialMedia.facebook.handle).toBe('@samattafoundation')
    expect(socialMedia.instagram.handle).toBe('@samattafoundation')
    expect(socialMedia.twitter.handle).toBe('@samattafoundation')
    expect(socialMedia.youtube.handle).toBe('@samattafoundation')
    expect(socialMedia.linkedin.handle).toBe('@samattafoundation')
  })

  it('should have valid URLs for each platform', () => {
    Object.values(socialMedia).forEach((platform) => {
      expect(platform.url).toBeTruthy()
      expect(platform.url).toMatch(/^https?:\/\//)
    })
  })

  it('should have displayName for each platform', () => {
    Object.values(socialMedia).forEach((platform) => {
      expect(platform.displayName).toBeTruthy()
      expect(typeof platform.displayName).toBe('string')
    })
  })

  it('openSocialMedia should return the correct URL', () => {
    const facebookUrl = openSocialMedia('facebook')
    expect(facebookUrl).toBe(socialMedia.facebook.url)

    const instagramUrl = openSocialMedia('instagram')
    expect(instagramUrl).toBe(socialMedia.instagram.url)
  })

  it('openSocialMedia should handle invalid platform gracefully', () => {
    const result = openSocialMedia('invalidplatform' as any)
    expect(result).toBe('')
  })
})
