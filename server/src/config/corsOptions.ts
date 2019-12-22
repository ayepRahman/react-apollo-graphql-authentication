const CLIENT_PORT = process.env.CLIENT_PORT || 'http://localhost:3000';

interface ICors {
  origin: string;
  credentials: boolean;
}

const corsOptions: ICors = {
  origin: CLIENT_PORT,
  credentials: true,
};

export default corsOptions;
