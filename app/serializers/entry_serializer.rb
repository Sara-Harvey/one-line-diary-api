class EntrySerializer
  include FastJsonapi::ObjectSerializer
  attributes :date, :content, :category_id, :category 
  belongs_to :category, serializer: CategorySerializer
end



