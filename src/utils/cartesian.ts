export function cartesian_operation(fragments: any[]) {
  const results: any[] = [], last_position = fragments.length - 1

  const helper = (acc: any[], current_position: number) => {
    for (let i = 0, n = fragments[current_position].length; i < n; i++) {
      const gen = [...acc]
      gen.push(fragments[current_position][i])
      if (current_position == last_position) {
        results.push(gen)
      } else {
        helper(gen, current_position + 1)
      }
    }
  }

  helper([], 0)
  return results
}