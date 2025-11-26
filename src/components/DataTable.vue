
<script setup>
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['row-click'])

const getCellValue = (item, column) => {
  const value = item[column.key]
  if (value === undefined || value === null || value === '') {
    return '—'
  }
  return value
}
</script>

<template>
  <div class="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.key"
            scope="col"
            class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
          >
            {{ column.label || column.key }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="item in props.items"
          :key="item.id || item.code"
          class="hover:bg-gray-50 cursor-pointer transition-colors"
          @click="emit('row-click', item)"
        >
          <td
            v-for="column in props.columns"
            :key="column.key"
            class="px-5 py-4 whitespace-nowrap text-sm text-gray-800"
          >
            <StatusBadge v-if="column.key === 'status'" :status="item[column.key]" />
            <span v-else>{{ getCellValue(item, column) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
