export default function formatPhoneNumber(phone: string) {
  const phoneCleaned = ('' + phone).replace(/\D/g, '');
  let phoneMatch;
  if (phone.length === 11 ) {
    phoneMatch = phoneCleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/)

    if (phoneMatch) {
      return `(${phoneMatch[1]}) ${phoneMatch[2]} ${phoneMatch[3]}-${phoneMatch[4]}`
    }
  }
  
  phoneMatch = phoneCleaned.match(/^(\d{2})(\d{4})(\d{4})$/)

  if (phoneMatch) {
    return `(${phoneMatch[1]}) ${phoneMatch[2]}-${phoneMatch[3]}`
  }

  return null;
}