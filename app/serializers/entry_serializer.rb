class EntrySerializer
  include FastJsonapi::ObjectSerializer
  attributes :date, :content, :type_id, :type 
  belongs_to :type
end



