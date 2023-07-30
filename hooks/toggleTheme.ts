import { useTheme } from "vuetify";
import { onMounted, watch } from "vue";

export default function toggleTheme() {
  const theme = useTheme();

  // preserve theme in localStorage
  watch(
    () => theme.global.current.value.dark,
    () => {
      localStorage.setItem(
        "theme",
        theme.global.current.value.dark ? "dark" : "light",
      );
    },
  );

  onMounted(() => {
    // initialize theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      theme.global.name.value = savedTheme;
    }
  });

  return {
    theme,
    toggleTheme: () =>
    (theme.global.name.value = theme.global.current.value.dark
      ? "light"
      : "dark"),
  };
}
