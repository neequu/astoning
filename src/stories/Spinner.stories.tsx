import type { Meta, StoryObj } from '@storybook/react'
import { Spinner as SpinnerUI } from '@/components/ui/spinner'

const meta = {
  title: 'ui/spinner',
  component: SpinnerUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    className: 'text-pink-400',
    size: 36,
  },
} satisfies Meta<typeof SpinnerUI>

export default meta

type Story = StoryObj<typeof meta>

export const Spinner: Story = {}
