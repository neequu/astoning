import type { Meta, StoryObj } from '@storybook/react'
import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { Button as ButtonUI } from '@/components/ui/button'

const meta = {
  title: 'ui/button',
  component: ButtonUI,
  decorators: [withKnobs],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: text('label', 'Hello'),
    className: text('class', ''),
    disabled: boolean('disabled', false),
  },
} satisfies Meta<typeof ButtonUI>

export function KnobsButton() {
  return <ButtonUI disabled={boolean('disabled', false)}>{text('label', 'b-b-button')}</ButtonUI>
}

export default meta

type Story = StoryObj<typeof meta>

export const Button: Story = {}
