class EntryTypeSerializer < ActiveModel::Serializer
  attributes :id, :entry_id, :type_id
  belongs_to :entry 
  belongs_to :type 
end
