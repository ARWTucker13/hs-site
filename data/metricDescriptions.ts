export const METRIC_DESCRIPTIONS: Record<string, { name: string; description: string }> = {
  efficiency: {
    name: "Efficiency",
    description:
      "How well the health system converts inputs (money, personnel, facilities) into outputs (services, coverage). Population measures include cost per unit of service, administrative overhead as a share of total health spending, hospital bed occupancy rates, average length of stay, and the ratio of health spending to health outcomes.",
  },
  quality: {
    name: "Quality",
    description:
      "The degree to which health services meet established professional standards and improve outcomes. Population measures include clinical adherence to evidence-based protocols, surgical complication rates, hospital-acquired infection rates, diagnostic accuracy, and preventable adverse event rates.",
  },
  access: {
    name: "Access",
    description:
      "Whether individuals who need health services can obtain them without undue barrier. Population measures include geographic coverage (facilities per capita), financial access (proportion facing catastrophic payments to receive care), timeliness (average wait times), and service availability (essential medicine stock-out rates).",
  },
  health_status: {
    name: "Health Status",
    description:
      "The overall health of a population as shaped by the health system and broader determinants. Population measures include life expectancy at birth, infant and under-5 mortality rates, maternal mortality ratio, disease-specific mortality and morbidity, and disability-adjusted life years (DALYs).",
  },
  customer_satisfaction: {
    name: "Customer Satisfaction",
    description:
      "How the population perceives and experiences the health system. Population measures include patient satisfaction surveys, perceived responsiveness of the system, respect for dignity and autonomy, degree of choice among providers, and timeliness and communication quality.",
  },
  risk_protection: {
    name: "Risk Protection",
    description:
      "The degree to which the health system shields individuals from financial hardship due to illness. Population measures include rate of catastrophic health expenditure (spending >10\u201325% of household income), medical impoverishment rate, out-of-pocket spending as a share of total health expenditure, and breadth and depth of insurance coverage.",
  },
};
