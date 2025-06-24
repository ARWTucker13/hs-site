export interface ControlKnobSubComponent {
  name: string;
  description: string;
  items?: string[];
}

export interface ControlKnob {
  id: string;
  name: string;
  description: string;
  subComponents: ControlKnobSubComponent[];
  relatedComponents: {
    [framework: string]: string[];
  };
}

export const controlKnobsFramework = {
  name: "Control Knobs Framework",
  description: "A framework for analyzing health system performance through key adjustable components",
  knobs: [
    {
      id: 'financing',
      name: 'Financing',
      description: 'How health systems raise and allocate funds',
      subComponents: [
        {
          name: 'Revenue Collection',
          description: 'How money is gathered for health services',
          items: [
            'Taxes',
            'Employer and Individual Contributions',
            'Out-of-Pocket Spending'
          ]
        },
        {
          name: 'Pooling',
          description: 'Combining funds to spread risk',
          items: [
            'Single-Payer System',
            'Social Health Insurance',
            'Private Insurance',
            'Community-Based Health Insurance'
          ]
        }
      ],
      relatedComponents: {
        'WHO Building Blocks': ['Health Financing'],
        'Lancet Commission': ['Financial Protection']
      }
    },
    {
      id: 'payment',
      name: 'Payment',
      description: 'Mechanisms of financial compensation in healthcare',
      subComponents: [
        {
          name: 'Provider Payment Mechanisms',
          description: 'Methods of compensating healthcare providers'
        },
        {
          name: 'Incentive Structures',
          description: 'Financial incentives that influence healthcare behavior'
        }
      ],
      relatedComponents: {
        'WHO Building Blocks': ['Health Workforce', 'Service Delivery'],
        'Lancet Commission': ['Workforce Performance', 'Financial Protection']
      }
    },
    {
      id: 'organization',
      name: 'Organization',
      description: 'Structural arrangements of health system entities',
      subComponents: [
        {
          name: 'Governance',
          description: 'Decision-making and oversight structures'
        },
        {
          name: 'Management',
          description: 'Administrative and operational coordination'
        }
      ],
      relatedComponents: {
        'WHO Building Blocks': ['Leadership/Governance', 'Health Information Systems'],
        'Lancet Commission': ['Organizational Performance', 'Quality Improvement']
      }
    },
    {
      id: 'regulation',
      name: 'Regulation',
      description: 'Rules and laws governing the health system',
      subComponents: [
        {
          name: 'Licensing',
          description: 'Ensuring providers meet standards'
        },
        {
          name: 'Accreditation',
          description: 'Formal recognition of organizations or programs'
        }
      ],
      relatedComponents: {
        'WHO Building Blocks': ['Leadership/Governance'],
        'Lancet Commission': ['Regulatory Performance']
      }
    },
    {
      id: 'behavior',
      name: 'Behavior',
      description: 'Actions of individuals and organizations in the health system',
      subComponents: [
        {
          name: 'Patient Behavior',
          description: 'How patients seek and use care'
        },
        {
          name: 'Provider Behavior',
          description: 'How providers deliver care'
        }
      ],
      relatedComponents: {
        'WHO Building Blocks': ['Service Delivery'],
        'Lancet Commission': ['Behavioral Performance']
      }
    }
  ]
};