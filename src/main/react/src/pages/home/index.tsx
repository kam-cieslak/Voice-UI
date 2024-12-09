import { useRecognition } from "../../hooks/RecognitionContext";

export default function HomePage() {
  const {start} = useRecognition();
  return <h1>Home page</h1>;
}
