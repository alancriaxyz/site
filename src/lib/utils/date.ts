export function getTime(date: string): number {
    return new Date(date).getTime();
}

export function timeAgo(date: string | Date): string {
    const now = new Date();
    const pastDate = typeof date === 'string' ? new Date(date) : date;
    const secondsPast = (now.getTime() - pastDate.getTime()) / 1000;
  
    if (secondsPast < 60) {
      return `${Math.floor(secondsPast)} segundos atrás`;
    }
    if (secondsPast < 3600) {
      return `${Math.floor(secondsPast / 60)} minutos atrás`;
    }
    if (secondsPast < 86400) {
      return `${Math.floor(secondsPast / 3600)} horas atrás`;
    }
    if (secondsPast < 2592000) {
      return `${Math.floor(secondsPast / 86400)} dias atrás`;
    }
    if (secondsPast < 31536000) {
      return `${Math.floor(secondsPast / 2592000)} meses atrás`;
    }
  
    return `${Math.floor(secondsPast / 31536000)} anos atrás`;
  }