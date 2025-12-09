import { StyleSheet } from 'react-native';


export const THEME = {
  bg: '#0f172a',      // Dark Slate
  card: '#1e293b',    // Lighter Slate
  primary: '#00e59b', // Neon Green
  accent: '#8b5cf6',  // Violet
  text: '#f8fafc',    // Whiteish
  textDim: '#94a3b8', // Grey
  danger: '#ef4444',
};



export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  logoContainer: { alignItems: 'center', marginTop: 80, marginBottom: 40 },
  title: { fontSize: 32, fontWeight: '800', color: THEME.text, letterSpacing: 1, textAlign: 'center' },
  subtitle: { fontSize: 16, color: THEME.textDim, marginTop: 5, textAlign: 'center' },
  
  // Forms
  form: { paddingHorizontal: 30 },
  label: { color: THEME.text, marginBottom: 8, fontSize: 14, fontWeight: '600' },
  inputGroup: { flexDirection: 'row', gap: 10 },
  input: { backgroundColor: THEME.card, padding: 16, borderRadius: 12, color: THEME.text, flex: 1, borderWidth: 1, borderColor: '#334155' },
  countryPicker: { backgroundColor: THEME.card, padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, borderColor: '#334155' },
  inputText: { color: THEME.text },
  dropdown: { position: 'absolute', top: 80, left: 30, zIndex: 10, backgroundColor: THEME.card, padding: 10, borderRadius: 8, width: 80, borderWidth: 1, borderColor: '#334155' },
  dropdownItem: { paddingVertical: 8 },

  // Buttons
  btn: { padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  btnText: { fontWeight: 'bold', fontSize: 16 },

  // Upload
  uploadBox: { height: 150, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, borderStyle: 'dashed', borderWidth: 2, borderColor: '#334155', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  uploadText: { color: THEME.textDim, marginTop: 10 },
  uploadedImg: { width: '100%', height: '100%', borderRadius: 14 },

  // Dashboard
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  welcome: { color: THEME.textDim, fontSize: 14 },
  playerName: { color: THEME.text, fontSize: 24, fontWeight: 'bold', letterSpacing: 1 },
  rankBadge: { backgroundColor: 'rgba(0, 229, 155, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: THEME.primary },
  rankText: { color: THEME.primary, fontWeight: 'bold' },
  
  heroCard: { margin: 20, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#334155' },
  heroLabel: { color: THEME.textDim, fontSize: 12, textTransform: 'uppercase' },
  heroValue: { color: THEME.text, fontSize: 36, fontWeight: '900', fontStyle: 'italic' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 15 },
  subStat: { color: THEME.text, fontWeight: '600' },

  sectionTitle: { color: THEME.text, fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 10, marginBottom: 15 },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  statCard: { width: '45%', backgroundColor: THEME.card, margin: '2.5%', padding: 15, borderRadius: 16, borderWidth: 1, borderColor: '#334155' },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  statLabel: { color: THEME.textDim, fontSize: 12 },
  statValue: { color: THEME.text, fontSize: 20, fontWeight: 'bold' },
  statSub: { color: THEME.primary, fontSize: 12, marginTop: 4 },

  ratingsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10 },
  ratingPill: { backgroundColor: '#334155', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  pillText: { color: THEME.textDim, fontSize: 12 }
});
