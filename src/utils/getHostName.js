// Detect base host automatically
export function getBaseHost() {
  if (typeof window === 'undefined') {
    return 'play-cricket-staging.com';
  }

  const host = window.location.hostname;

  if (host.includes('play-cricket-staging.com')) {
    return 'play-cricket-staging.com';
  }

  if (host.includes('play-cricket.com')) {
    return 'play-cricket.com';
  }

  // default (local dev)
  return 'play-cricket-staging.com';
}

export const BASE_HOST = getBaseHost();
