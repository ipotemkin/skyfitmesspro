import './App.css';
import { Button } from './components/Button/Button';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        margin: '10px',
      }}
    >
      <Button type="action" buttonStatus="normal" buttonText="Войти" />
      <Button
        type="outlined"
        buttonStatus="normal"
        buttonText="Зарегистрироваться"
      />
      <Button
        type="outlined"
        buttonStatus="disabled"
        buttonText="Зарегистрироваться"
      />
      <Button
        type="secondary"
        buttonStatus="normal"
        size="m"
        buttonText="Наверх ↑"
      />
      <Button
        type="tertiary"
        buttonStatus="normal"
        size="s"
        buttonText="Войти"
      />
    </div>
  );
}

export default App;
