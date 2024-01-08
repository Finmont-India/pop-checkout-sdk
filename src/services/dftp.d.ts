interface DftpOptions {
    attemptReference: string;
    sensitiveFields: string[];
    // Add other properties if needed
  }
  
  interface Dftp {
    init(options: DftpOptions): void;
    // Add other methods or properties if needed
    profileCompleted:()=>any;
  }
  