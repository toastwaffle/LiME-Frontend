export function maybeCascadeDelete(tasksByID, task_id, cascade) {
  var parents = new Set([task_id]);
  if (!cascade) return parents;
  function isChild(parentSet) {
    return task => parentSet.has(task.parent_id) || parentSet.has(task.object_id);
  }
  var taskToObject = task => task.object_id;
  var newParents = new Set(Object.values(tasksByID).filter(isChild(parents)).map(taskToObject));
  while (newParents.size > parents.size) {
    parents = newParents;
    newParents = new Set(Object.values(tasksByID).filter(isChild(parents)).map(taskToObject));
  }
  return newParents;
}
