import type { Meta, StoryObj } from '@storybook/react'
import { Button as ButtonUI } from '@/components/ui/button'

const meta = {
  title: 'ui/button',
  component: ButtonUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Hello',
    className: 'bg-pink-400 p-20',
  },
} satisfies Meta<typeof ButtonUI>

export default meta

type Story = StoryObj<typeof meta>

export const Button: Story = {}
