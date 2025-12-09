import { Text, View } from "react-native";
import { styles, THEME } from "../styles/GlobalStyleSheet";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ElementType; // Optional icon component
  subValue?: string | number; // Optional sub-value
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  subValue,
}) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <Text style={styles.statLabel}>{label}</Text>
      {Icon && <Icon size={16} color={THEME.primary} />}
    </View>
    <Text style={styles.statValue}>{value}</Text>
    {subValue && <Text style={styles.statSub}>{subValue}</Text>}
  </View>
);
export default StatCard;
