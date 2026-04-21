import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: colors.surface,
  backgroundGradientTo: colors.surface,
  color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(160, 160, 160, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const ChartWidget = ({ type = 'bar', labels, data, title }) => {
  const chartData = {
    labels: labels || [],
    datasets: [
      {
        data: data || [],
      },
    ],
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {type === 'bar' && (
        <BarChart
          data={chartData}
          width={screenWidth - 48}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          style={styles.chart}
          showValuesOnTopOfBars
        />
      )}
      {/* We could add pie or line variants depending on the type prop */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  chart: {
    borderRadius: 8,
  },
});

export default ChartWidget;
