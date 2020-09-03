class EntrySerializer < ActiveModel::Serializer
  belongs_to :type
  attributes :type_id, :date, :content  
end
