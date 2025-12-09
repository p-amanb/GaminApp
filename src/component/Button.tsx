import { Text, TouchableOpacity } from "react-native";
import { THEME, styles } from "../styles/GlobalStyleSheet";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger'|'outline'; // Optional, default is 'primary'
  icon?: React.ElementType; // Optional, pass a React component
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', icon: Icon }) => {
  const bg = variant === 'primary' ? THEME.primary : THEME.card;
  const txt = variant === 'primary' ? '#000' : THEME.text;
  
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: bg, borderColor: variant === 'outline' ? THEME.primary : 'transparent', borderWidth: variant === 'outline' ? 1 : 0 }]} onPress={onPress}>
      {Icon && <Icon size={20} color={txt} style={{ marginRight: 8 }} />}
      <Text style={[styles.btnText, { color: txt }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button